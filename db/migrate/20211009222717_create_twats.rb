class CreateTwats < ActiveRecord::Migration[6.1]
  def change
    create_table :twats do |t|
      t.string :body, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
