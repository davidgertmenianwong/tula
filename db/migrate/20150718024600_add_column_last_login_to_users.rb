class AddColumnLastLoginToUsers < ActiveRecord::Migration
  def change
    add_column :users, :last_login, :datetime
  end
end