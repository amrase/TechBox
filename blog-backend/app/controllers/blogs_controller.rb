class BlogsController < ApplicationController
  # before_action :get_user

    def index
        @blogs = Blog.all
        render json:  @blogs
    end

    def show
      @blog= Blog.find(params[:id])
      render json:  @blog
    end

    # def new
    #   @blog= Blog.new
    #   render json:  @blog
    # end
    def create 
      @blog = Blog.create(blog_params)
      if @blog.valid?
          render json:  @blog
      else 
          render json: {errors: @blog.errors.full_messages} 
      end
  end  

    def destroy
      @blog= Blog.find(params[:id])
      @blog.destroy
      
      render json: @blog
    end

    # def edit
    #   @blog= Blog.find(params[:id])
    #   render json:  @blogs
    # end

    # def update
    #   @blog= Blog.find(params[:id])
    #   @blog.update_attributes(params[:blog])

    #    render json: @blog
    #  end

     private

     def get_user 
       @user = User.find(id)
     end

      def blog_params
         params.require(:blog).permit(:title,:description,:user_id)
      end   

    #  before_action :set_blog
  
    # def index
    #     @blogs = Blog.all
    #     render json: @blogs
    #  end


    #  def show
    #      @comment = Comment.new
    #      @comments = @blog.comments
    #  end    


    # def new 

    # end    

    # def create
    # #   @user = User.find(params[:user_id])
    #    @blog = Blog.create(title: params[:title],description: params[:description],user: @user)

    #   if @blog.save
    #       render json: @blogs
    #   else
    #      render json: {errors: @blog.errors.full_messages}
    #   end    
    # end


    # def update
    #     @user = User.find(params[:user_id])
    #     @blog = @user.find_by(id: params[:id])
    #     if @blog.valid?
    #         @blog.update(title: params[:title],description: params[:description])
    #         render json: @blog
    #     else
    #        render json: {errors: @blog.errors.full_messages}
    #     end
    # end

    # def destroy 
    #     @blog = Blog.find(params[:id])
    #     @blog.destroy() 

    #     @comment = Comment.find(params[:id])

    #     @comment.destroy()

    #     render json: @blog
    # end    

    # private 

    # def set_blog
    #     @blog = Blog.find_by(params[:id])
    # end    
   
    # def blog_params
    #    params.require(:blog).permit(:title,:description,:user_id )
    # end   
end
