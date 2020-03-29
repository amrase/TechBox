class AddColumnsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :email, :string
    add_column :users, :location, :string
    add_column :users, :dob, :string
  end
end
