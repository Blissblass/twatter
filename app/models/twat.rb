class Twat < ApplicationRecord
  validates :body, length: { minimum: 1, maximum: 250 }
  belongs_to :user
  has_many :comments, class_name: 'Comment', foreign_key: 'post_id', dependent: :destroy
  has_many :likes
  
end