class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :twats
  has_many :likes
  has_many :followers, class_name: 'Follow', foreign_key: 'followee_id'
  has_many :follows, class_name: 'Follow', foreign_key: 'follower_id'
end
