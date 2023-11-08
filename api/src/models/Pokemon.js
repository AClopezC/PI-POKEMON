const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define('Pokemon', {
      //?url => id
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         allowNull: false,
         primaryKey: true
      },
      nombre: {
         type: DataTypes.STRING,
         allowNull: false,
         len: [2, 60],
         unique: true
      },
      //?url => sprites
      imagen: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      //?url => stats
      vida: {
         type: DataTypes.INTEGER,
         allowNull: false,
         max: 1000000000,
         min: -1000000000
      },
      ataque: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      defensa: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      velocidad: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      altura: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      peso: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
   },
      { freezeTableName: true, timestamps: false }
   );
};

//? Sequelize cambia los nombres de los modelos a plural, para evitar que haga cambios es el freeze.
//? El timestamps es para que no se creen fechas de actualización.