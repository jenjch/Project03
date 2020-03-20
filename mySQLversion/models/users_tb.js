module.exports = function(sequelize, DataTypes) {
  var users_tb = sequelize.define("user_tb", 
  {
    email:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [8,50]},
    },

    password:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [5,50]},
    },

    firstname:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,50]},
    },

    lastname:
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,50]},
    },
  },
  {freezeTableName: true}
  );

  //Associating users table with trips table
  //When a user is deleted, also delete any associated links
  users_tb.associate = function(models) 
  {
    users_tb.hasMany(models.trips_tb, 
    {
      onDelete: "cascade"
    });
  }

  return users_tb;
};
