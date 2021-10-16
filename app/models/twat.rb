class Twat < ApplicationRecord
  belongs_to :user
  has_many :likes
  validates :body, length: { minimum: 1, maximum: 250 }
end