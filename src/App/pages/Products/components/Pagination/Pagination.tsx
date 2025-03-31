import cn from 'classnames';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import style from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onChange }: PaginationProps) => {
  return (
    <nav className={cn(style.pagination)}>
      <button
        className={cn(style.pageItem, style.pagePrev, { [style.disabled]: currentPage === 1 })}
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowRightIcon width={35} height={35} />
      </button>
      <ul className={cn(style['pagination__list'])}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <li key={i + 1} className={cn(style.pageItem)}>
            <a
              href="#"
              className={cn(style.pageLink, { [style.pageLink_active]: currentPage === i + 1 })}
              onClick={() => onChange(i + 1)}
            >
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
      <button
        className={cn(style.pageItem, style.pageNext, { [style.disabled]: currentPage === totalPages })}
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon width={35} height={35} />
      </button>
    </nav>
  );
};

export default Pagination;
