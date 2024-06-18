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
  class Customer extends Model<Customer> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;  // Note: Usually, IDs are numeric and auto-increment
  
    @Default(null)
    @Column
    marketplaceId: string;
  
    @Default(null)
    @Column
    customerZoopId: string;
  
    @Default(null)
    @Column
    first_name: string;
  
    @Column
    last_name: string;  // Changed from Date to string
  
    @Column
    cpf: string;  // Added missing @Column decorator
  
    @CreatedAt
    @Column
    createdAt: Date;
  
    @UpdatedAt
    @Column
    updatedAt: Date;
  }
  
  export default Customer;
  