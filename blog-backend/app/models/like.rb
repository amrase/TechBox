class Like < ApplicationRecord
  belongs_to :news
  belongs_to :blog
  belongs_to :user
end
