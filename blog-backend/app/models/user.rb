require 'valid_email'

class User < ApplicationRecord
    has_secure_password


    has_many :followed_users, foreign_key: :follower_id, class_name: 'Follow'
    has_many :followees, through: :followed_users,dependent: :destroy

    has_many :following_users, foreign_key: :followee_id, class_name: 'Follow'
    has_many :followers, through: :following_users,dependent: :destroy


    has_many :blogs
    # ,dependent: :destroy

    has_many :comments

    # has_many :blogs_comments, through: :comments, source: :blog, dependent: :destroy
    #has_many :blogs ,through: :comments, dependent: :destroy
    
    validates :username, uniqueness: {message: "must be unique"}
    validates :firstname ,:lastname,:dob,presence:true
    validates :username, presence: {message: "can't be blank"}
    validates :email, :presence => true, :email => true 

    def full_name
        self.firstname + " " + self.lastname
    end  
 
end
