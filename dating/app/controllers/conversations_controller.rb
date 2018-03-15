class ConversationsController < ApplicationController

def index
  @conversations = Conversation.all
  render json: {conversations: @conversations}
end

def create
  @conversation = Conversation.create!(conversation_params)
  render json: {conversation: @conversation}
end

private

 def conversation_params
  params.require(:conversation).permit(:sender_id, :recipient_id)
 end

end