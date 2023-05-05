import React from 'react';
import {
  FieldsColumn,
  FieldsContainer,
  PageContainer,
  PasswordDiv,
  Load,
  Page,
} from './style';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserPayload } from '../../TYPES/user';
import { userApi } from '../../API/apiUser';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { franchisesApi } from '../../API/apiFranchises';
import { FranchisePayload } from '../../TYPES/franchise';
import { formatCPF } from '../../COMPONENTS/mask';
import { Sidebar } from '../../COMPONENTS/sidebar';

type viewPasswords = {
  password: boolean;
};

export function RegisterUser() {
  const [viewPassword, setViewPassword] = useState<viewPasswords>({
    password: false,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserPayload>();
  const [franchises, setFranchises] = useState<FranchisePayload[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  async function getUserById() {
    setLoading(true);
    if (id) {
      const user = await userApi.getUserById(id);
      setUsers(user);
    }
    setLoading(false);
  }

  async function getFranchises() {
    const franchises = (await franchisesApi.getFranchise()) ?? [];
    setFranchises(franchises);
  }

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getUserById(), getFranchises()]);
    }
    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newUser = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      cpf: formData.get('cpf')?.toString() || '',
      password: formData.get('password')?.toString(),
      user_type: formData.get('user_type')?.toString() || '',
      franchiseId: formData.get('franchiseId')?.toString() || '',
      created_at: new Date(),
    };

    if (!newUser.password) {
      delete newUser.password;
    }

    let userResponse;
    if (id) {
      const userToUpdate = { ...newUser, id: id };
      const updatedUser = {
        ...userToUpdate,
        created_at: users?.created_at,
      };
      userResponse = await userApi.updateUser(updatedUser);
      navigate('/user');
    } else {
      userResponse = await userApi.createUser(newUser);
      setLoading(false);
      navigate('/user');
    }
  }

  const handleCancel = () => {
    navigate('/user');
  };

  async function handleDeactivate() {
    const updatedUser = {
      ...users,
      closed_at: new Date(),
    };
    const response = await userApi.activateUser(updatedUser.id ?? '');
    setUsers({ ...updatedUser, closed_at: new Date() });
  }

  async function handleActivate() {
    const updatedUser = {
      ...users,
      closed_at: undefined,
    };
    const response = await userApi.deactivateUser(updatedUser.id ?? '');
    setUsers(updatedUser);
  }

  return (
    <>
      {loading ? (
        <Load />
      ) : (
        <Page>
          <Sidebar />
          <PageContainer>
            <form onSubmit={handleSubmit}>
              <h1>{id ? 'Atualizar Usuário' : 'Registar Novo Usuário'}</h1>
              <FieldsContainer>
                <FieldsColumn>
                  <label htmlFor="name">Nome</label>
                  <input
                    defaultValue={users?.name}
                    required={!id}
                    type="text"
                    name="name"
                    placeholder="Nome"
                  />
                  <label htmlFor="cpf">CPF</label>
                  <input
                    defaultValue={users?.cpf}
                    required={!id}
                    type="text"
                    name="cpf"
                    placeholder="cpf"
                    maxLength={14}
                    onChange={(event) => {
                      const formattedValue = formatCPF(event.target.value);
                      event.target.value = formattedValue;
                    }}
                  />
                  <label htmlFor="email">email</label>
                  <input
                    defaultValue={users?.email}
                    required={!id}
                    type="text"
                    name="email"
                    placeholder="email"
                  />
                </FieldsColumn>
                <FieldsColumn>
                  <label htmlFor="password">Senha</label>
                  <PasswordDiv>
                    <input
                      value={users?.password || ''}
                      required={!id}
                      placeholder="Senha"
                      type={viewPassword.password ? 'text' : 'password'}
                      name="password"
                      onChange={(event) =>
                        setUsers({ ...users, password: event.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setViewPassword({
                          ...viewPassword,
                          password: !viewPassword.password,
                        });
                      }}
                    >
                      {viewPassword.password ? (
                        <AiFillEyeInvisible color="navy" size={20} />
                      ) : (
                        <AiFillEye color="navy" size={20} />
                      )}
                    </button>
                  </PasswordDiv>
                  <label htmlFor="user_type">Tipo do usuário</label>
                  <select
                    required={!id}
                    name="user_type"
                    defaultValue={users?.user_type}
                  >
                    <option
                      value="franquia"
                      selected={users?.user_type === 'franquia'}
                    >
                      franquia
                    </option>
                    <option
                      value="hyperlocal"
                      selected={users?.user_type === 'hyperlocal'}
                    >
                      hyperlocal
                    </option>
                  </select>
                  <label htmlFor="franchiseId">Franquia</label>
                  {franchises.length ? (
                    <select
                      name="franchiseId"
                      defaultValue={users?.franchiseId}
                    >
                      <option value="">Sem franquia</option>
                      {franchises.map((franchise) => (
                        <option key={franchise.id} value={franchise.id}>
                          {franchise.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>Carregando...</p>
                  )}
                </FieldsColumn>
              </FieldsContainer>
              {id ? (
                <>
                  <button type="submit">Editar</button>
                  {users?.closed_at ? (
                    <button type="submit" onClick={handleActivate}>
                      Ativar
                    </button>
                  ) : (
                    <button type="submit" onClick={handleDeactivate}>
                      Desativar
                    </button>
                  )}
                </>
              ) : (
                <button type="submit">Criar</button>
              )}
              <button onClick={handleCancel}>Cancelar</button>
            </form>
          </PageContainer>
        </Page>
      )}
    </>
  );
}
