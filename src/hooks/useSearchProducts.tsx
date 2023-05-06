import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { SearchData, searchSchema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'
import { SortBy } from 'src/types/product.type'

export default function useSearchProducts() {
  const { register, handleSubmit } = useForm<SearchData>({
    defaultValues: {
      searchName: ''
    },
    resolver: yupResolver(searchSchema)
  })

  const queryConfig = useQueryConfig()
  const navigage = useNavigate()

  const handleSearch = handleSubmit((data) => {
    navigage({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            name: data.searchName,
            sort_by: SortBy.SOLD
          },
          ['order']
        )
      ).toString()
    })
  })
  return { handleSearch, register }
}
