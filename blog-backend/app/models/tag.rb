class Tag < ApplicationRecord
  belongs_to :category 
  belongs_to :blog
  belongs_to :news
end
