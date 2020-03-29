class CommentsController < ApplicationController

    
    def index 
        @comments = Comment.all 
        # @user  = User.find(params[:id])
        # @blog = Blog.find(params[:id])

        render json: @comments
    end

    def create 
        @comment = Comment.create(comment_params)
        if @comment.valid?
            render json:  @comment
        else 
            render json: {errors: @comment.errors.full_messages} 
        end 
    end    

    private

    def comment_params
        params.permit(:comment,:blog_id,:user_id)
     end   
end
