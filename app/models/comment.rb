class Comment < ApplicationRecord
  belongs_to :poster, class_name: 'User', foreign_key: 'user_id'
  belongs_to :twat, class_name: 'Twat', foreign_key: 'post_id'

end