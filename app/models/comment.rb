class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :twat, class_name: 'Twat', foreign_key: 'post_id'

end