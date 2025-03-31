import { Suspense, useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";
import { CardSkeleton } from "@/components/LoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import PresetMessageChat from "@/components/messages/PresetMessageChat";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { useMessageCleanup } from "@/hooks/useMessageCleanup";
import MockDataPopulator from "@/components/messages/MockDataPopulator";

function ConversationsList({ onSelectConversation }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);

  // Fetch conversations
  useEffect(() => {
    async function fetchConversations() {
      try {
        const { data: conversations, error } = await supabase
          .from("conversations")
          .select(`
            *,
            treater:treater_id!conversations_treater_id_fkey (
              id,
              email,
              user_profiles (
                full_name,
                avatar_url
              )
            ),
            treatee:treatee_id!conversations_treatee_id_fkey (
              id,
              email,
              user_profiles (
                full_name,
                avatar_url
              )
            )
          `)
          .or(`treater_id.eq.${user.id},treatee_id.eq.${user.id}`)
          .order("updated_at", { ascending: false });

        if (error) throw error;

        setConversations(conversations || []);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        toast.error("Failed to load conversations");
      }
    }

    if (user) {
      fetchConversations();
    }
  }, [user]);

  if (conversations.length === 0) {
    return (
      <Card className="bg-white border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle>No Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You don't have any conversations yet. Start connecting with people!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conversation) => {
        const otherUser =
          conversation.treater_id === user.id
            ? conversation.treatee
            : conversation.treater;

        return (
          <Button
            key={conversation.id}
            variant="ghost"
            className="w-full justify-start gap-4 p-4 hover:bg-gray-100"
            onClick={() => onSelectConversation(conversation)}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={otherUser.avatar_url} />
              <AvatarFallback>{otherUser.display_name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="font-medium">{otherUser.display_name}</span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(conversation.updated_at), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}

function MessagesList() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { user } = useAuth();

  const handleStartConversation = async (treateeId) => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          treater_id: user.id,
          treatee_id: treateeId,
          status: "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      setSelectedConversation(data);
      toast.success("Conversation started!");
    } catch (error) {
      toast.error("Error starting conversation", {
        description: error.message,
      });
    }
  };

  if (selectedConversation) {
    const otherUser =
      selectedConversation.treater_id === user.id
        ? selectedConversation.treatee
        : selectedConversation.treater;

    return (
      <div className="h-full">
        <div className="flex items-center gap-2 p-4 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedConversation(null)}
          >
            Back
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src={otherUser.avatar_url} />
            <AvatarFallback>{otherUser.display_name?.[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{otherUser.display_name}</span>
        </div>
        <PresetMessageChat
          conversationId={selectedConversation.id}
          otherUser={otherUser}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold">Messages</h1>
      </div>
      <ConversationsList onSelectConversation={setSelectedConversation} />
    </div>
  );
}

export default function Messages() {
  useMessageCleanup();

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container mx-auto p-4">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<CardSkeleton />}>
            <MockDataPopulator />
            <MessagesList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </ScrollArea>
  );
}
