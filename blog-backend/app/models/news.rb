class News < ApplicationRecord
    has_many :likes
    has_many :blogs,through: :likes,dependent: :destroy
end
