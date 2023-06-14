import { Box } from '@mui/system'
import * as React from 'react'
import tmdbConfigs from 'src/api/configs/tmdb.configs'
import Container from 'src/components/common/Container'
import HeroSlide from 'src/components/common/HeroSlide'
import MediaSlide from 'src/components/common/MediaSlide'
import uiConfigs from 'src/configs/ui.config'

export function HomePage() {
  return (
    <>
      <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />

      <Box marginTop='-4rem' sx={{ ...uiConfigs.style.mainContent }}>
        <Container header='popular movies'>
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header='popular series'>
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.popular} />
        </Container>

        <Container header='top rated movies'>
          <MediaSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>

        <Container header='top rated series'>
          <MediaSlide mediaType={tmdbConfigs.mediaType.tv} mediaCategory={tmdbConfigs.mediaCategory.top_rated} />
        </Container>
      </Box>
    </>
  )
}
