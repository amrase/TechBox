class BlogSerializer < ActiveModel::Serializer
  attributes :id,:title,:image,:description,:user,:likes,:comments

  #:comments.user.username

  def comments
    self.object.comments.map do |cmt|
      {   comment: cmt.comment ,
          user: cmt.user.username
      }
    end 
  end 
end


