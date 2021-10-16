class ChangeLikes < ActiveRecord::Migration[6.1]
  def change
    rename_column :likes, :post_id, :twat_id
  end
end
