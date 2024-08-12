import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserUseCase } from '@/domain/use-cases/users/create-user.use-case';
import { DeleteUserUseCase } from '@/domain/use-cases/users/delete-user.use-case';
import { EditUserUseCase } from '@/domain/use-cases/users/edit-user.use-case';
import { FetchUsersUseCase } from '@/domain/use-cases/users/fetch-users.use-case';
import { GetUserByEmailUseCase } from '@/domain/use-cases/users/get-user-by-email.use-case';
import { GetUserByIDUseCase } from '@/domain/use-cases/users/get-user-by-id.use-case';
import { GetUserByUsernameUseCase } from '@/domain/use-cases/users/get-user-by-username.use-case';
import { CreateProductUseCase } from '@/domain/use-cases/products/create-product.use-case';
import { DeleteProductUseCase } from '@/domain/use-cases/products/delete-product.use-case';
import { EditProductUseCase } from '@/domain/use-cases/products/edit-product.use-case';
import { FetchProductsUseCase } from '@/domain/use-cases/products/fetch-products.use-case';
import { GetProductByIDUseCase } from '@/domain/use-cases/products/get-product-by-id.use-case';
import { AuthenticateController } from './controllers/authenticate-user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, AuthenticateController],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    EditUserUseCase,
    FetchUsersUseCase,
    GetUserByEmailUseCase,
    GetUserByIDUseCase,
    GetUserByUsernameUseCase,
    CreateProductUseCase,
    DeleteProductUseCase,
    EditProductUseCase,
    FetchProductsUseCase,
    GetProductByIDUseCase,
  ],
})
export class HttpModule {}
