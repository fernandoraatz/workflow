import { TodoModule } from './list.module';

describe('TodoModule', () => {
  let todoModule: TodoModule;

  beforeEach(() => {
    todoModule = new TodoModule();
  });

  it('should create an instance', () => {
    expect(todoModule).toBeTruthy();
  });
});
