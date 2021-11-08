class Twat < ApplicationRecord
  validates :body, length: { minimum: 1, maximum: 250 }
  belongs_to :user
  has_many :comments
  has_many :likes
  
end