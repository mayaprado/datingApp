class ConversationsController < ApplicationController

def index
 @user = User.find(params[:id])
 @conversations = @user.conversations
 render json: {conversations: @conversations}
end

def create
 if Conversation.between(params[:sender_id],params[:recipient_id])
   .present?
    @conversation = Conversation.between(params[:sender_id],
     params[:recipient_id]).first
 else
  @conversation = Conversation.create!(conversation_params)
 end
 render json: {conversation: @conversation}
end

private

 def conversation_params
  params.require(:conversation).permit(:sender_id, :recipient_id)
 end

end