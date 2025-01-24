import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL')|| process.env.DATABASE_URL,
        connectionFactory: async (connection) => {
          console.log('Setting up MongoDB connection handlers...');
          
          connection.on('error', (err) => {
            console.log('🔴 MongoDB connection error:', err);
          });
          
          connection.on('connected', () => {
            console.log('🟢 MongoDB successfully connected!');
            console.log('Connected to:', connection.name);
          });
          
          connection.on('disconnected', () => {
            console.log('🔸 MongoDB disconnected!');
          });
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
