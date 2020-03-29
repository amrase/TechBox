class CreateNews < ActiveRecord::Migration[6.0]
  def change
    create_table :news do |t|
      t.string :title
      t.string :image
      t.string :text

      t.timestamps
    end
  end
end
