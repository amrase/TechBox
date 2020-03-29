class NewsController < ApplicationController
    def index
        @news = News.all 
        render json: @news
    end  
end
