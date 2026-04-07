import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderService = {
    bookTickets: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrderService)
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('.create() should call bookTickets method of OrderService', () => {
    const order = {
      email: 'test@test.ru',
      phone: '+7 (000) 000-00-00',
      tickets: [
        {
          film: '123',
          session: '456',
          daytime: '2023-05-29T10:30:00.001Z',
          row: 1,
          seat: 1,
          price: 350,
        },
      ],
    };
    controller.create(order);
    expect(service.bookTickets).toHaveBeenCalledWith(order);
  });
});
