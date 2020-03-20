module.exports = function(sequelize, DataTypes) 
{
  var receipts_tb = sequelize.define("receipts_tb", 
  {
    receiptname:  
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,100]}
    },
    receipedate:  
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,100]}
    },
    currency:  
    {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1,100]}
    },
    foreignamount:  
    {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {len: [1,100]}
    },
    usdamount:  
    {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {len: [1,100]}
    }
  },
  {freezeTableName: true}
  );
  

  //Associating trips with a user
  //A trip can not be created without a user due to the foreign key
  receipts_tb.associate = function(models) 
  {
    receipts_tb.belongsTo(models.trips_tb, 
    {
      foreignKey: { allowNull: false}
    });
  }
  return receipts_tb;
}
