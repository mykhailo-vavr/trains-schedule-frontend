import { Wrapper } from './styles';
import { TableProps } from './types';

const Table = <T extends object>(props: TableProps<T>) => <Wrapper {...props} />;

export default Table;
