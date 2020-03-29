class Blog < ApplicationRecord
    belongs_to :user
    # has_many :comments
    # has_many :users,dependent: :destroy

    # has_many :blogs_comments, through: :comments, source: :blog, dependent: :destroy
    
    has_many :comments, dependent: :destroy
   
    has_many :likes
    has_many :news,through: :likes,dependent: :destroy

end

