import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';

@Module({
  imports: [StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
