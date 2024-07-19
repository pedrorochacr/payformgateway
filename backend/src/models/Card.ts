import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    AutoIncrement,
    Default
  } from "sequelize-typescript";
  
  @Table
  class Card extends Model<Card> {
    @PrimaryKey
    @Column
    id: string;  

    @Default(null)
    @Column
    customerId: string;

    @CreatedAt
    @Column
    createdAt: Date;
  
    @UpdatedAt
    @Column
    updatedAt: Date;
  }
  
  export default Card;
  