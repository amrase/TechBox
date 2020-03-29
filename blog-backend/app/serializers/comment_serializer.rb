class CommentSerializer < ActiveModel::Serializer
  attributes :id,:comment,:user,:blog


  # def user
  #   self.object.users.map do |user|
  #     {   user: user.username ,
  #     }
  #   end 
  # end 

end
