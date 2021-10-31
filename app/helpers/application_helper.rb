module ApplicationHelper

  def flash_messages
    flash.map { |type, msg| { id: msg.object_id, type: type, msg: msg } }
  end

end
