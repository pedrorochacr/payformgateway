import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    PrimaryKey,
    AutoIncrement,
    Default,
  } from "sequelize-typescript";
  
  @Table
  class Transaction extends Model<Transaction> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Default(null)
    @Column
    payment_type: string;
  
    @Column
    customerId: number;
  
    @Column
    amount: number;
  
    @CreatedAt
    @Column
    createdAt: Date;
  
    @UpdatedAt
    @Column
    updatedAt: Date;
  }
  
  export default Transaction;
  