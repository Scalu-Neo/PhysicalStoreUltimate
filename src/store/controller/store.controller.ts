import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { StoreServiceRepository } from '../service/storeRepository.service';
import { StoresResponseDto } from '../dto/store.response.dto';
import { StoreResponseDistanceFreigth } from '../service/store.freitgh.service';
import { Store } from '../entities/store.entity';

@Controller() 
export class StoreController {
  constructor(
    private readonly appRepository: StoreServiceRepository,
    private readonly appService: StoreResponseDistanceFreigth,
  ) {}

  @Get('/listAll')
  @HttpCode(200)
  @ApiOperation({ summary: 'Lista todas as lojas cadastradas' })
  @ApiResponse({ status: 200, description: 'Retorna todas as lojas', type: [Store] })
  async getAllStore(): Promise<Store[]> {
    const allStore: Store[] = await this.appRepository.listAllStore();
    return allStore;
  }

  @Get('/storeByCep')
  @ApiOperation({ summary: 'Busca loja pelo CEP' })
  @ApiQuery({ name: 'cep', required: true, description: 'CEP da loja para busca' })
  @ApiResponse({ status: 200, description: 'Informações da loja associada ao CEP', type: StoresResponseDto })
  @ApiResponse({ status: 404, description: 'CEP não encontrado ou erro no processamento' })
  async getStoreCep(@Query('cep') cep: string): Promise<StoresResponseDto> {
    const stores: Store[] = await this.appRepository.listAllStore();
    const resultStores: Promise<StoresResponseDto> = this.appService.processStores(cep, stores);
    return resultStores;
  }

  @Get('/storeByState')
  @HttpCode(200)
  @ApiOperation({ summary: 'Busca lojas por estado' })
  @ApiQuery({ name: 'state', required: true, description: 'Estado para busca das lojas' })
  @ApiResponse({ status: 200, description: 'Retorna todas as lojas no estado fornecido', type: [Store] })
  @ApiResponse({ status: 404, description: 'Estado não encontrado' })
  async getStoreState(@Query('state') state: string): Promise<Store[]> {
    console.log("Estado recebido:", state);
    const resultStateStore: Store[] = await this.appRepository.getByState(state);
    return resultStateStore;
  }

  @Get('/storeById')
  @ApiOperation({ summary: 'Busca loja pelo ID' })
  @ApiQuery({ name: 'id', required: true, description: 'ID da loja para busca' })
  @ApiResponse({ status: 200, description: 'Informações da loja com o ID fornecido', type: Store })
  @ApiResponse({ status: 404, description: 'Loja não encontrada' })
  async getStoreId(@Query('id') id: string): Promise<Store> {
    const resultOneStore: Store = await this.appRepository.getById(id);
    return resultOneStore;
  }

  @Post('/createStore')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria uma nova loja' })
  @ApiBody({ type: Store, description: 'Dados necessários para criação da loja' })
  @ApiResponse({ status: 201, description: 'Loja criada com sucesso', type: Store })
  @ApiResponse({ status: 400, description: 'Erro ao criar loja (dados inválidos)' })
  async createStore(@Body() dataStore: Store): Promise<Store> {
    const newStore: Store = await this.appRepository.createStore(dataStore);
    return newStore;
  }
}
