class CategoriesController < ApplicationController
    def index 
        @category = Category.all 
        render json: @category
    end    
end
