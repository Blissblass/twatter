class Comment < ApplicationRecord
  belongs_to :poster, class_name: 'User', foreign_key: 'user_id'
  belongs_To :twat, class_name: 'Post', foreign_key: 'post_id'

end