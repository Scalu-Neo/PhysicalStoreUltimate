import { Test, TestingModule } from '@nestjs/testing';
import { FreightStrategyFactory } from '../store/factories/freigth.strategy.factory';
import { Store } from '../store/entities/store.entity';
import { StoreServiceRepository } from '../store/service/storeRepository.service';
import { StoreRepository } from '../store/repository/store.repository';  // Importe o repositório real
import { IFreightStrategy } from '../store/interface/freigth.stategy.interface';

// Mocking das interfaces de estratégias de frete
const mockLojaFreightStrategy: IFreightStrategy = { calculateFreigth: jest.fn() };
const mockPdvFreightStrategy: IFreightStrategy = { calculateFreigth: jest.fn() };
const mockLojaMotoBoyStrategy: IFreightStrategy = { calculateFreigth: jest.fn() };
const mockPdvFarFreigthStrategy: IFreightStrategy = { calculateFreigth: jest.fn() };

// Mock para o StoreRepository
const mockStoreRepository = {
  findAll: jest.fn().mockResolvedValue([]),  // Mock do método findAll
  findById: jest.fn().mockResolvedValue(null),  // Mock do método findById
  findByState: jest.fn().mockResolvedValue([]),  // Mock do método findByState
  insertOne: jest.fn().mockResolvedValue(null),  // Mock do método insertOne
};

describe('FreightStrategyFactory', () => {
  let factory: FreightStrategyFactory;
  let service: StoreServiceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FreightStrategyFactory,
        StoreServiceRepository,
        { provide: 'LojaFreightStrategy', useValue: mockLojaFreightStrategy },
        { provide: 'PdvFreigthStrategy', useValue: mockPdvFreightStrategy },
        { provide: 'LojaMotoBoyStrategy', useValue: mockLojaMotoBoyStrategy },
        { provide: 'PdvFarFreigthStrategy', useValue: mockPdvFarFreigthStrategy },
        {
          provide: StoreRepository,
          useValue: mockStoreRepository,  // Fornecendo o mock do StoreRepository
        },
      ],
    }).compile();

    service = module.get<StoreServiceRepository>(StoreServiceRepository);
    factory = module.get<FreightStrategyFactory>(FreightStrategyFactory);
  });

  it('deve estar definido', () => {
    expect(factory).toBeDefined();
  });

  describe('createFreigthStrategy', () => {
    it('deve retornar LojaFreightStrategy quando o tipo de loja for LOJA e a distância > 50', () => {
      const store = new Store();
      store.type = 'LOJA';
      store.storeName = 'Loja Teste';

      const distance = 60;
      const result = factory.createFreigthStrategy(store, distance);

      expect(result).toBe(mockLojaFreightStrategy);
    });

    it('deve retornar LojaMotoBoyStrategy quando o tipo de loja for LOJA e a distância <= 50', () => {
      const store = new Store();
      store.type = 'LOJA';
      store.storeName = 'Loja Teste';

      const distance = 40;
      const result = factory.createFreigthStrategy(store, distance);

      expect(result).toBe(mockLojaMotoBoyStrategy);
    });

    it('deve retornar PdvFarFreigthStrategy quando o tipo de loja for PDV e a distância > 50', () => {
      const store = new Store();
      store.type = 'PDV';
      store.storeName = 'PDV Teste';

      const distance = 60;
      const result = factory.createFreigthStrategy(store, distance);

      expect(result).toBe(mockPdvFarFreigthStrategy);
    });

    it('deve retornar PdvFreightStrategy quando o tipo de loja for PDV e a distância <= 50', () => {
      const store = new Store();
      store.type = 'PDV';
      store.storeName = 'PDV Teste';

      const distance = 40;
      const result = factory.createFreigthStrategy(store, distance);

      expect(result).toBe(mockPdvFreightStrategy);
    });

    it('deve lançar um erro quando o tipo de loja for inválido', () => {
      const store = new Store();
      store.type = 'INVALIDO';
      store.storeName = 'Store Teste';

      const distance = 30;

      expect(() => factory.createFreigthStrategy(store, distance)).toThrowError(
        'Invalid store type: INVALIDO for store: Store Teste',
      );
    });
  });
});
