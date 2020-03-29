class LikesController < ApplicationController
    def create
       
            @blog = Blog.find( params[:blog_id] )
      
            if @like = Like.find_by( blog_id: @blog.id, user: current_user )
               @like.destroy
            else
               @like = Like.new( blog_id: @blog.id, user: current_user )
               @like.save
            end
      
            render json: @blogs
        
     end
end
