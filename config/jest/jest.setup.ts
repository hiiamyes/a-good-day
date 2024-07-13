import '@testing-library/jest-dom';

jest.mock('@uidotdev/usehooks', () => ({ useLongPress: jest.fn() }));
