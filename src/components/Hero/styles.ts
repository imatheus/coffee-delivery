import styled from 'styled-components'

export const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 12% 24%,
      ${({ theme }) => theme.colors.heroGlowYellow} 0%,
      transparent 48%
    ),
    radial-gradient(
      circle at 86% 68%,
      ${({ theme }) => theme.colors.heroGlowPurple} 0%,
      transparent 46%
    );
`

export const HeroContainer = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 2.5rem 1rem 3rem;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 2.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3.5rem 2rem 4.5rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
    gap: 3.5rem;
    padding: 4.5rem 2rem 5.5rem;
  }
`

export const HeroTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: clamp(2rem, 4.4vw, 3rem);
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.title};
`

export const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.subtitle};
  max-width: 36rem;
`

export const BenefitsGrid = styled.ul`
  list-style: none;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.125rem 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

export const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.text};
`

type BadgeTone = 'yellowDark' | 'espresso' | 'yellow' | 'purple'

export const BenefitIcon = styled.span<{ $tone: BadgeTone }>`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, $tone }) => {
    switch ($tone) {
      case 'yellowDark':
        return theme.mode === 'dark' ? '#C47F17' : theme.colors.yellowDark
      case 'espresso':
        return theme.mode === 'dark' ? '#574F4D' : theme.colors.text
      case 'yellow':
        return theme.mode === 'dark' ? '#B98A1A' : theme.colors.yellow
      case 'purple':
        return theme.colors.purple
    }
  }};
`

export const HeroVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    max-width: 29.75rem;
    height: auto;
    filter: drop-shadow(0 18px 28px ${({ theme }) => theme.colors.shadowColor});
    transition: transform 0.35s ease;
  }

  img:hover {
    transform: translateY(-4px);
  }
`
