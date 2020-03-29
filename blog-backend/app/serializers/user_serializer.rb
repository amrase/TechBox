class UserSerializer < ActiveModel::Serializer
  attributes :id,:username,:firstname,:lastname,:email,:dob,:location,:image,:full_name,:followers,:followees,:blogs

  has_many :blogs

  def blogs
    self.object.blogs.map do |blog|
      {   id: blog.id,
          title: blog.title ,
          description: blog.description,
          image: blog.image
          # user: cmt.user.username
      }
      
    end 
  end 
  def followees
    self.object.followees.map do |followees|
      {   username: followees.username ,
          full_name: followees.full_name ,
      }
      
    end 
  end 
  def followers
    self.object.followers.map do |followers|
      {   username: followers.username ,
          full_name: followers.full_name ,
      }
      
    end 
  end 
  def comments
    self.object.comments.map do |comments|
      {   name: comments.comment ,
        
      }
      
    end 
  end 

  



  
end
