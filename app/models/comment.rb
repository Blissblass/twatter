class Comment < ApplicationRecord
  belongs_to :poster, class_name: 'User', foregin_key: 'user_id'
  

end