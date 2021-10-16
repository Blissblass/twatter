class Follow < ApplicationRecord
  belongs_to :user, class_name: 'User', foreign_key: 'follower_id'
end