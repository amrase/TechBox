class Category < ApplicationRecord
    has_many :tags
    
    has_many :blogs, through: :tags,dependent: :destroy

    has_many :news, through: :tags,dependent: :destroy
end
