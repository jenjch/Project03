module.exports = function(sequelize, DataTypes) 
{
  var trips_tb = sequelize.define("trips_tb", 
  {
    tripname:  
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,100]}
    }
  },
  {freezeTableName: true}
  );
  

  //Associating trips with a user
  //A trip can not be created without a user due to the foreign key
  trips_tb.associate = function(models) 
  {
    trips_tb.belongsTo(models.users_tb, 
    {
      foreignKey: { allowNull: false}
    });
  }


  //Associating trips table with receipts table
  //When a trip is deleted, also delete any associated links
  trips_tb.associate = function(models) 
  {
    trips_tb.hasMany(models.receipts_tb, 
    {
      onDelete: "cascade"
    });
  }

  return trips_tb;
};
